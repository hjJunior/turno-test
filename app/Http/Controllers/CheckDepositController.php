<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckDeposit\StoreCheckDepositRequest;
use App\Http\Resources\CheckDepositResource;
use App\Models\CheckDeposit;
use App\States\CheckDepositStatus\Accepted;
use App\States\CheckDepositStatus\Rejected;
use Spatie\QueryBuilder\QueryBuilder;

class CheckDepositController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = CheckDeposit::accessibleByUser($user);

        $checkDeposits = QueryBuilder::for($query)
            ->allowedFilters(['state'])
            ->when($user->is_admin, fn ($q) => $q->with('user'))
            ->paginate()
            ->withQueryString();

        return CheckDepositResource::collection($checkDeposits);
    }

    public function store(StoreCheckDepositRequest $request)
    {
        $this->authorize('store', CheckDeposit::class);

        $picture = $request->file('picture')->store('/check-deposits');
        $data = array_merge($request->validated(), ['picture' => $picture]);

        $checkDeposit = auth()->user()->checkDeposits()->create($data);

        return new CheckDepositResource($checkDeposit);
    }

    public function accept(CheckDeposit $checkDeposit)
    {
        $this->authorize('accept', $checkDeposit);

        $checkDeposit->state->transitionTo(Accepted::class);

        return response()->noContent();
    }

    public function reject(CheckDeposit $checkDeposit)
    {
        $this->authorize('reject', $checkDeposit);

        $checkDeposit->state->transitionTo(Rejected::class);

        return response()->noContent();
    }
}
